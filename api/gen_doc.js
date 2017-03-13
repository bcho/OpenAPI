const async = require('async')
const fs = require('fs')
const join = require('path').join
const yaml = require('js-yaml')

const apiSchemaPath = join(__dirname, 'swagger.yml')
const apiSchema = yaml.safeLoad(fs.readFileSync(apiSchemaPath))

function pathToDocName(path) {
  return `${path.replace(/^\//, '')}`
}

function pathToDocFileName(path) {
  return `${path.replace(/^\//, '')}.md`
}

function describeAPI(methodSchema) {
  return (methodSchema.decl.description || '').trim()
}

function describeRequestMethod(methodSchema) {
  return [
    '```',
    `${methodSchema.method} {base_url}${methodSchema.path}`,
    '```'
  ].join('\n')
}

function describeRequestParameters(methodSchema) {
  let content = []
  if (methodSchema.decl.authentication != false) {
    content = content.concat([
      '**需要登录**',
      '',
    ])
  }

  const parameters = methodSchema.decl.parameters || []
  if (parameters.length > 0) {
    content = content.concat([
      '| 参数名称 | 参数类型 | 参数是否必须？ | 说明 | 样例 |',
      '|:--------:|:--------:|:--------------:|------|------|',
    ])

    parameters.forEach((p) => {
      let type = '`string`'
      if (p.type) {
        type = `\`${p.type}\``
      }
      const line = [
        `\`${p.name}\``,
        type,
        p.required ? '是' : '否',
        (p.description || '').trim(),
        (p.example || '').trim(),
      ].join(' | ')
      content.push(`| ${line} |`)
    })
  }

  if (methodSchema.decl.parameters_example) {
    content.push('')
    content.push('```json')
    content.push(methodSchema.decl.parameters_example.trim())
    content.push('```')
  }

  return content.join('\n')
}

function describeResponse(methodSchema) {
  const responses = methodSchema.decl.responses
  let content = []

  Object.keys(responses).forEach((statusCode) => {
    if (statusCode === 'default') return

    content = content.concat([
      `### ${statusCode}`,
      '',
      '```json',
      (responses[statusCode].example || '').trim(),
      '```',
    ])
  })

  if (responses.default) {
    content = content.concat([
      `### 错误响应`,
      '',
      '```json',
      '{',
      '  "code": // error code,',
      '  "error": "unexpected error"',
      '}',
      '```',
    ])
  }

  return content.join('\n')
}

async.forEachOf(apiSchema.paths, (decl, path, callback) => {
  const methodSchema = {
    path,
    method: Object.keys(decl)[0].toUpperCase(),
    decl: Object.values(decl)[0],
  }

  const content = [
    `# ${pathToDocName(path)}`,
    '',
    describeAPI(methodSchema),
    '',
    '## 请求方式',
    '',
    describeRequestMethod(methodSchema),
    '',
    '## 请求参数',
    '',
    describeRequestParameters(methodSchema),
    '',
    '## 响应',
    '',
    describeResponse(methodSchema),
    '',
    '<!-- generated by gen_doc.js -->'
  ].join('\n')

  const file = join(__dirname, pathToDocFileName(path))
  fs.writeFileSync(file, content.trim() + '\n')
  console.log(`generated ${file}`)
})

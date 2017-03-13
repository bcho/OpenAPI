# message.update_text

更新一条消息的内容。

## 请求方式

```
PATCH {base_url}/message.update_text
```

## 请求参数

**需要登录**

| 参数名称 | 参数类型 | 参数是否必须？ | 说明 | 样例 |
|:--------:|:--------:|:--------------:|------|------|
| `message_key` | `string` | 是 | 更新的消息 key | 1487667236785.0077 |
| `text` | `string` | 是 | 更新的消息内容 | 中午吃啥啊？ |

## 响应

### 200

```json
{
  "key": "1485236262366.0193",
  "updated": "2017-01-24T13:37:42.000+0000",
  "is_channel": false,
  "uid": "=bw52O",
  "fallback": null,
  "attachments": [],
  "thread_key": null,
  "created": "2017-01-24T13:37:42.000+0000",
  "vchannel_id": "=bw52O",
  "refer_key": null,
  "robot_id": null,
  "created_ts": 1485236262366,
  "team_id": "=bw52O",
  "subtype": "normal",
  "text": "hello"
}
```
### 错误响应

```json
{
  "code": // error code,
  "error": "unexpected error"
}
```

<!-- generated by gen_doc.js -->
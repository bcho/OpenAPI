# user.list

返回团队内的用户列表，获取某个用户的完整信息，请使用 `user.info`.

## 请求方式

```
GET {base_url}/user.list
```

## 请求参数

**需要登录**


## 响应

### 200

```javascript
[
  {
    "inactive": false,
    "role": "normal",
    "email": "support@bearyinnovative.com",
    "name": "BearyBot",
    "type": "assistant",
    "created": "2017-01-11T12:28:31.000+0000",
    "id": "=bwMkR",
    "avatars": {
      "small": null,
      "medium": null,
      "large": null
    },
    "team_id": "=bw52O",
    "full_name": "倍洽小助手",
    "mobile": null,
    "profile": {
      "bio": null,
      "position": null,
      "skype": null
    }
  }
]
```
### 错误响应

```javascript
{
  "code": // error code,
  "error": "unexpected error"
}
```

<!-- generated by gen_doc.js -->

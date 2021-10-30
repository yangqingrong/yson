# yson
remove json's key for smaller size transfer,and restore it as json format after receive it

# expland
json -> yson ->json


# Example
```javascript
            var data = {
                code: 1,
                msg: 'ok',
                data: [
                    {
                        id: 1,
                        name: 'yqr',
                        age: 37
                    },
                    {
                        id: 2,
                        name: 'hi',
                        age: 130
                    }
                ]
            };

            console.log('------encode data to yson and keys--------')
            var r = yson_encode(data);
            console.log('yson:', r.yson);
            console.log('keys:', r.keys);

            console.log('------decode yson with keys--------')
            var data2 = yson_decode(r.yson, r.keys);
            console.log('data2:', data2);
```
# output
```console
------encode data to yson and keys--------
index.html:29 yson: {"a":1,"b":"ok","c":[{"d":1,"e":"yqr","f":37},{"d":2,"e":"hi","f":130}]}
index.html:30 keys: {"code":"a","msg":"b","data":"c","id":"d","name":"e","age":"f"}
index.html:31 ------decode yson with keys--------
index.html:33 data2: ....
```
# contact me
number: 13714715608
wechat: wudimei_com

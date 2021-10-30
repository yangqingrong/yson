/**
 *  @author Yang Qing-rong
 * @url https://wudimei.com/
 * @licence The MIT licence
 */


function yson_isNumber(n) {
    return isNaN(n) == false;
}

class YSON_Base52 {
    constructor() {
        this.num_str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    toInt(num) {
        //unimplement
    }

    fromInt(num) {
        if (num == 0) {
            return this.num_str.substring(0, 1);
        }
        let a = [];

        let n = num;
        let m = 0;
        while (n > 0) {
            m = n % 52;
            n = parseInt(n / 52);
            a.push(this.num_str.substring(m, m + 1));
        }
        return a.reverse().join('');
    }
}
class YSON_Encoder {

    constructor() {
        this.keys = {};
        this.newKeyId = 0;
        this.b52 = new YSON_Base52();
    }
    getKeyId(fieldName) {
        if (typeof (this.keys[fieldName]) != 'undefined') {
            return this.keys[fieldName];
        }
        let id = this.keys[fieldName] = this.b52.fromInt(this.newKeyId++);

        return id;
    }
    encode(data) {
        let d = new Object();
        if (Array.isArray(data)) {
            d = new Array();
        }
        for (let i in data) {
            let v = data[i];
            let k = i;
            if (yson_isNumber(i) == false)
            {
                k = this.getKeyId(i);
            }
            if (typeof (data[i]) == 'object') {
                v = this.encode(data[i]);

            }
            d[k] = v;
        }
        return d;
    }
}


function yson_encode(data) {
    let encoder = new YSON_Encoder();
    return {yson: JSON.stringify(encoder.encode(data)), keys: JSON.stringify(encoder.keys)};
}


class YSON_Decoder {

    constructor() {

    }
    getFieldName(keys, k) {
        for (let i in keys) {
            let v = keys[i];
            if (v == k) {
                return i;
            }
        }
        return '';
    }
    decode(data, keys) {

        let d = new Object();
        if (Array.isArray(data)) {
            d = new Array();
        }
        for (let i in data) {
            let v = data[i];
            let k = i;
            if (yson_isNumber(i) == false)
            {
                k = this.getFieldName(keys, i);
            }
            if (typeof (data[i]) == 'object') {
                v = this.decode(data[i], keys);

            }
            d[k] = v;
        }
        return d;
    }
}

function yson_decode(yson_body, yson_keys) {
    let decoder = new YSON_Decoder();
    let data = decoder.decode(JSON.parse(yson_body), JSON.parse(yson_keys));
    return data;
}

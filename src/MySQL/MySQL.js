const mysql = require('mysql')

class MySQL {
    constructor(tableName = '') {
        this.tableName = tableName;//表名
        this.conn = null;//数据库句柄
        this.fields = [];//字段
        this.wheres = [];//条件集合
        this._sql = '';//上一次发送的sql记录
        this.initDB();
    }
    static table(tableName) {
        return new MySQL(tableName);
    }
    // 初始化数据库
    initDB() {
        this.conn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'chat'
        });
    }
    // 取得字段
    getField() {
        if (this.fields.length <= 0) {
            return '*';
        } else {
            return this.fields.join(',');
        }
    }
    // 取得条件
    getWhere() {
        if (this.wheres.length <= 0) {
            return '';
        } else {
            return 'WHERE ' + this.wheres.join(' AND ');
        }
    }
    // 添加条件
    where(a, exp, b = null) {
        if (b === null) {
            b = exp;
            exp = '=';
        }

        function getWhere(_a, _exp, _b) {
            if (typeof _b == 'string') {
                _b = `'${_b}'`
            }
            return `${_a} ${_exp} ${_b}`;
        }

        if (typeof a == "object") {
            a.forEach(item => {
                this.wheres.push(getWhere(item[0], item[1], item[2]));
            });
            return this;
        }

        let where = getWhere(a, exp, b);
        this.wheres.push(where);
        return this;
    }
    // 添加字段
    field(field) {
        if (typeof field == 'string') {
            field = field.split(',');
        }
        let arr = this.fields.concat(field);
        this.fields = Array.from(new Set(arr));
        return this;
    }
    // 执行查询命令
    get(successCallback = new Function) {
        const command = 'SELECT';//命令
        const field = this.getField();//字段
        const where = this.getWhere();//条件
        let sql = `${command} ${field} FROM \`${this.tableName}\` ${where}`;
        this._sql = sql;
        this.conn.query(sql, (error, result, fields) => {
            if (error) throw error;
            successCallback(result);
            this.end();
        });
    }
    // 执行添加命令
    add(data, successCallback = new Function) {
        this.conn.query(`INSERT INTO ${this.tableName} SET ?`, data, (error, result, fields) => {
            if (error) throw error;
            successCallback(result.insertId);
            this.end();
        });
    }
    // 执行保存命令
    save(data, successCallback = new Function) {
        const where = this.getWhere();//条件
        this.conn.query(`UPDATE ${this.tableName} SET ? ${where}`, data, (error, result, fields) => {
            if (error) throw error;
            successCallback(result.affectedRows);
            this.end();
        });
    }
    // 结束句柄
    end() {
        this.conn.end();
    }
}
module.exports = MySQL;

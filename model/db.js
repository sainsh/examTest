var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'twinships'
})


exports.getShips = async () => {
    
    return new Promise((resolve, reject) => {
        
        var sql = "select * from ships left join ship_info on ships.ship_id = ship_info.ship_id";

        var con = connection.query(sql, async (error, results, fields) => {
            if (error){
                reject(error)
                throw error;
            }

            resolve(results)

        })
        
    })

    
}

exports.getShip = async (id) => {
    
    return new Promise((resolve, reject) => {
        
        var sql = `select * from ships left join ship_info on ships.ship_id = ship_info.ship_id where ships.ship_id = ${id} `;

        connection.query(sql, async (error, results, fields) => {
            if (error){
                reject(error)
                throw error;
            }

            resolve(results)

        })
        
    })

    
}

exports.insertShip = async (ship) =>{
    console.log(ship)

    return new Promise((resolve, reject) =>{
        var data= ship.ship;
        var sql = `insert into ships values(${data.ship_id}, "${data.navn}", "${data.hjemhavn}","${data.kaldesignal}", "${data.MMSI}", "${data.anvendelse}", ${data.BRT}, ${data.længde},${data.max_antal_personer})`;
             
        connection.query(sql, (error, results1, fields) =>{
            if (error){
                reject(error);
                throw error;
            }

           connection.query(`SELECT ship_id from ships where navn = "${data.navn}"`, (error, result, fields)=>{
                if(error){
                    reject(error)
                    throw(error)
                }
                var info= ship.ship_info
                sql = `insert into ship_info values(${result[0].ship_id}, ${info.fart}, ${info.kurs},${info.gps_længde}, ${info.gps_bredte}, ${info.vindretning}, ${info.vindstyrke})`;
                
                connection.query(sql , (error, results2, fields) =>{
                    if (error){
                        reject(error);
                        throw error;
                    }
                    resolve(results1[0] + results2[0])
                })

           })

            
        })
    })

}

exports.login = async(username, psw) =>{

    try{
    return new Promise((resolve, reject) =>{
        sql = `select user_name from users where user_name = "${username}" and password = "${psw}"`
        connection.query(sql, (error, results, fields) =>{
            if (error){
                resolve(false);
                throw error;
            }
            resolve(true)
        })
    })

    }catch(e){
        throw e;
    }
}

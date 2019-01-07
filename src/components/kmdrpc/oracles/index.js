// == Oracles ==
// oraclesaddress [pubkey]
export function oraclesaddress(rpc) {
    return new Promise((resolve, reject) => {
        // rpc.oraclesaddress().then(resp => {
        //     resolve(resp)
        // }).catch(error => {
        //     console.log(error)
        //     reject(error)
        // })
        reject("oraclesaddress - Not supported yet")
    })
}


// oraclescreate oraclescreate name description format
export function oraclescreate(rpc) {
    return new Promise((resolve, reject) => {
        // rpc.oraclescreate().then(resp => {
        //     resolve(resp)
        // }).catch(error => {
        //     console.log(error)
        //     reject(error)
        // })
        reject("oraclescreate - Not supported yet")
    })
}


// oraclesdata oraclesdata oracletxid hexstr
export function oraclesdata(rpc) {
    return new Promise((resolve, reject) => {
        // rpc.oraclesdata().then(resp => {
        //     resolve(resp)
        // }).catch(error => {
        //     console.log(error)
        //     reject(error)
        // })
        reject("oraclesdata - Not supported yet")
    })
}


// oraclesinfo fundingtxid
export function oraclesinfo(rpc, txid) {
    return new Promise((resolve, reject) => {
        rpc.oraclesinfo(txid).then(resp => {
            resolve(resp)
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
}


// oraclelist
export function oraclelist(rpc) {
    return new Promise((resolve, reject) => {
        rpc.oraclelist().then(resp => {
            resolve(resp)
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
}


// oraclesregister oracletxid datafee
export function oraclesregister(rpc) {
    return new Promise((resolve, reject) => {
        // rpc.oraclesregister().then(resp => {
        //     resolve(resp)
        // }).catch(error => {
        //     console.log(error)
        //     reject(error)
        // })
        reject("oraclesregister - Not supported yet")
    })
}

// oraclessamples oracletxid batonutxo num
export function oraclessamples(rpc) {
    return new Promise((resolve, reject) => {
        // rpc.oraclessamples().then(resp => {
        //     resolve(resp)
        // }).catch(error => {
        //     console.log(error)
        //     reject(error)
        // })
        reject("oraclessamples - Not supported yet")
    })
}

// oraclessubscribe oracletxid publisher datafee
export function oraclessubscribe(rpc) {
    return new Promise((resolve, reject) => {
        // rpc.oraclessubscribe().then(resp => {
        //     resolve(resp)
        // }).catch(error => {
        //     console.log(error)
        //     reject(error)
        // })
        reject("oraclessubscribe - Not supported yet")
    })
}


export default {
  oraclesaddress,
  oraclescreate,
  oraclesdata,
  oraclesinfo,
  oraclelist,
  oraclesregister,
  oraclessamples,
  oraclessubscribe
}

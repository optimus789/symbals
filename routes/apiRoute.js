const router = require("express").Router();
const axios = require("axios");
const { Wallet, providers } = require("ethers");
const { connect } = require("@textile/tableland");
const fetch = require("node-fetch");
globalThis.fetch = fetch

// Since we don't have Metamask, you need to supply a private key directly
let privKey = process.env.PRIV_KEY;
const wallet = new Wallet(privKey);
const provider = new providers.AlchemyProvider("rinkeby", process.env.ALCHEMY_KEY);
const signer = wallet.connect(provider);
let multTableRes, highTableRes;

router.route("/createMultiplierTable").get(async (req, res) => {
  const tbl = await connect({ network: "testnet", signer });
  multTableRes = await tbl.create(
    `CREATE TABLE multiplierTable (address text, mult int, primary key (address));`
  );
  console.log(multTableRes);
});

router.route("/listTables").get(async (req, res) => {
  const tbl = await connect({ network: "testnet", signer });
  const tables = await tbl.list();
  console.log(tables);
});

router.route("/createHighTable").get(async (req, res) => {
  const tbl = await connect({ network: "testnet", signer });
  highTableRes = await tbl.create(
    `CREATE TABLE highBoard (address text, score int, primary key (address));`
  );
});

router.route("/updateMultiplier/:address/:level").get(async (req, res) => {
  try {
    const tbl = await connect({ network: "testnet", signer });
    const address = req.params.address;
    const level = req.params.level;
    console.log(address,level)
    
    const queryableName = "multipliertable_452";
    console.log(queryableName);

    const queryRes = await tbl.query(`SELECT * FROM ${queryableName} WHERE address = '${address}';`);
    console.log("before update", queryRes);
    if (queryRes?.data?.rows && queryRes.data.rows.length > 0) {
      const deleteRes = await tbl.query(`DELETE FROM ${queryableName} WHERE address = '${address}';`);
      console.log("delete result: ", deleteRes);
      //const updateRes = await tbl.query(`UPDATE ${queryableName} SET level = ${level} WHERE address = ${address};`);
    }
    queryToSend = `INSERT INTO ${queryableName} (address, mult) VALUES ('${address}', `+Number(level)+`);`

    // for (const [rowId, row] of Object.entries(rows)) {
    //   console.log(`row: ${rowId}`);
    //   for (const [colId, data] of Object.entries(row)) {
    //     const { name } = columns[colId];
    //     console.log(`  ${name}: ${data}`);
    //   }
    // }

    const insertRes = await tbl.query(queryToSend);
    // const queryRes2 = await tbl.query(`SELECT * FROM ${queryableName};`);
    console.log("after insert",insertRes);
    res.send("Success");
  } catch (error) {
    console.log(error);
    res.send("Error");
  }
});

router.route("/getMultiplier/:address").get(async (req, res) => {
  try {
    const tbl = await connect({ network: "testnet", signer });
    const address = req.params.address;

    const queryableName = "multipliertable_452";
    console.log(queryableName);
    const queryRes = await tbl.query(`SELECT * FROM ${queryableName} WHERE address = '${address}';`);
    if (queryRes.length !== 0) {
      res.send(queryRes);
    }
    else {
      res.send("Not Available");
    }
  } catch (error) {
    console.log(error);
    res.send("Error");
  }

});

router.route("/delMultiplier/:address").get(async (req, res) => {
    try {
      const tbl = await connect({ network: "testnet", signer });
      const address = req.params.address;
  
      const queryableName = "multipliertable_452";
      console.log(queryableName);
      const queryRes = await tbl.query(`DELETE FROM ${queryableName} WHERE address = '${address}';`);
      if (queryRes.length !== 0) {
        res.send(queryRes);
      }
      else {
        res.send("Not Available");
      }
    } catch (error) {
      console.log(error);
      res.send("Error");
    }
  
  });
  

module.exports = router;
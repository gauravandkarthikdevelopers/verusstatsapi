const express = require('express');
const axios = require('axios');

function getBalance(address) {
    return axios.get(`https://explorer.verus.io/ext/getbalance/${address}`)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.error('Error', error);
            throw error; // Propagate the error
        }); 
}

function getDistribution() {
    return axios.get("https://explorer.verus.io/ext/getdistribution")
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.error('Error', error);
            throw error; // Propagate the error
        }); 
}
 

function getMoneySupply() {
    return axios.get("https://explorer.verus.io/ext/getmoneysupply")
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.error('Error', error);
            throw error; // Propagate the error
        }); 
}


// Function to fetch transaction details by transaction hash
function getTransaction(txhash) {
    return axios.get(`https://insight.verus.io/api/tx/${txhash}`)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.error('Error', error);
            throw error; // Propagate the error
        }); 
}

// Function to fetch address details by address
function getAddress(address) {
    return axios.get(`https://explorer.verus.io/ext/getaddress/${address}`)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.error('Error', error);
            throw error; // Propagate the error
        }); 
}

function getNetworkHashRate() {
    return axios.get("https://insight.verus.io/api/getnetworkhashps")
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.error('Error', error);
            throw error; // Propagate the error
        }); 
}


function getBlock(hash) {
    return axios.get(`https://insight.verus.io/api/getblock?hash=${hash}`)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.error('Error', error);
            throw error; // Propagate the error
        }); 
}



function getBlockHash(index) {
    return axios.get(`https://insight.verus.io/api/getblockhash?index=${index}`)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.error('Error', error);
            throw error; // Propagate the error
        }); 
}

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Route handler for /getdifficulty
app.get('/getdifficulty', (req, res) => {
    axios.get("https://insight.verus.io/api/getdifficulty")
        .then((response) => {
            res.json(response.data); // Send the response data back to the client
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error fetching difficulty data' }); // Send error response
        });
});

// Route handler for /getblockcount
app.get('/getblockcount', (req, res) => {
    axios.get("https://insight.verus.io/api/getblockcount")
        .then((response) => {
            res.json(response.data); // Send the response data back to the client
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error fetching block count data' }); // Send error response
        });
});

// Route handler for /getblockhash/:index
app.get('/getblockhash/:index', (req, res) => {
    const index = req.params.index;
    getBlockHash(index)
        .then((data) => {
            res.json(data); // Send the response data back to the client
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error fetching block hash data' }); // Send error response
        });
});

// Route handler for /getblock/:hash
app.get('/getblock/:hash', (req, res) => {
    const hash = req.params.hash;
    getBlock(hash)
        .then((data) => {
            res.json(data); // Send the response data back to the client
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error fetching block data' }); // Send error response
        });
});

// Route handler for /getnetworkhashrate
app.get('/getnetworkhashrate', (req, res) => {
    getNetworkHashRate()
        .then((data) => {
            res.json(data); // Send the response data back to the client
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error fetching network hash rate data' }); // Send error response
        });
});

// Route handler for /gettransaction/:txhash
app.get('/gettransaction/:txhash', (req, res) => {
    const txhash = req.params.txhash;
    getTransaction(txhash)
        .then((data) => {
            res.json(data); // Send the response data back to the client
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error fetching transaction data' }); // Send error response
        });
});

// Route handler for /getaddress/:address
app.get('/getaddress/:address', (req, res) => {
    const address = req.params.address;
    getAddress(address)
        .then((data) => {
            res.json(data); // Send the response data back to the client
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error fetching address data' }); // Send error response
        });
});


app.get('/getmoneysupply', (req, res) => {
    getMoneySupply()
        .then((data) => {
            res.json(data); // Send the response data back to the client
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error fetching money supply data' }); // Send error response
        });
});


app.get('/getdistribution', (req, res) => {
    getDistribution()
        .then((data) => {
            res.json(data); // Send the response data back to the client
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error fetching distribution data' }); // Send error response
        });
});


app.get('/getbalance/:address', (req, res) => {
    const address = req.params.address;
    getBalance(address)
        .then((data) => {
            res.json(data); // Send the response data back to the client
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error fetching balance data' }); // Send error response
        });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

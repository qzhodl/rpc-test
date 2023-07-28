const { ethers } = require("ethers");
const axios = require("axios");

// Provider instance (e.g., connecting to an Ethereum node)
const provider = new ethers.providers.JsonRpcProvider("http://localhost:9545");

// Contract instance
const contractAddress = "0x6aA14eE71632F62C16003781260668A7d666374a"; // Address of the smart contract
const contractABI = [
  {
    constant: true,
    inputs: [
      {
        name: "key",
        type: "bytes32",
      },
      {
        name: "off",
        type: "uint256",
      },
      {
        name: "len",
        type: "uint256",
      },
    ],
    name: "get",
    outputs: [
      {
        name: "result",
        type: "bytes",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "test",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
]; // ABI of the smart contract
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// Function to call
const functionName = "get"; // Name of the function you want to call

// Parameters for the function (if any)
const functionParams = [
  "0x0000000000000000000000000000000000000000000000000000000000000001",
  1,
  9,
]; // Array of function parameters

const ethereumNodeURL = "http://localhost:9545";

// Call the function using eth_call
async function callContract() {
  try {
    // Encode the function data
    const functionData = contract.interface.encodeFunctionData(
      functionName,
      functionParams
    );

    const rpcRequest = {
      jsonrpc: "2.0",
      id: 1,
      method: "eth_call",
      params: [
        {
          to: contractAddress,
          data: functionData,
          from: "0xBeFFb94A85904f0Aba9C0DDB857d7Ff840Cf86Bd",
        },
        "latest",
      ],
    };
    const response = await axios.post(ethereumNodeURL, rpcRequest);
    if (response.data.error) {
      // Error occurred in the JSON-RPC response
      console.error("Error:", response.data.error);
    } else {
      const result = response.data.result;
      console.log("Call result:", result);
      // Process the result as needed
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

callContract();

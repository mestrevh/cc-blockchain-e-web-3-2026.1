pragma solidity ^0.8.20;

contract HelloWorld {

    uint256 public storedData;

    function set(uint256 x) public {
        storedData = x;
    }

    function get() public view returns (uint256) {
        return storedData;
    }

    function getMessage() public pure returns (string memory) {
        return unicode"hello world from blokchain";
    }
}
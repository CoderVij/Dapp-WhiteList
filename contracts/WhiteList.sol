//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;


contract WhiteList
{
    uint8 public maxWhiteListAddressAllowed;

    mapping(address => bool) public whiteListedAddress;

    uint8 public numAddressesWhitelisted;

    constructor(uint8 _maxWhiteListAddressAllowed)
    {
        maxWhiteListAddressAllowed = _maxWhiteListAddressAllowed;
    }


    function addAddressToWhiteList() public
    {

        require(!whiteListedAddress[msg.sender], "Address is already whitelisted");
        require(maxWhiteListAddressAllowed > numAddressesWhitelisted, "More address can't be listed");
        whiteListedAddress[msg.sender] = true;
        numAddressesWhitelisted += 1;
    }
}
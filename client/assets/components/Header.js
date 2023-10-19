import React, {useState} from 'react';
import Global from '../Global';
import axios from 'axios';
import {Navigate} from 'react-router-dom';

const Header = () => {

    const url = Global.url;

    return(
        <nav id="navbar"></nav>
    );
}

export default Header;
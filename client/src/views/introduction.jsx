import React from 'react'
import {Text, View} from 'react-native'
import Carousel from '../components/carousel.jsx'

const images = [
    "https://n9.cl/mssjl",
    "https://acortar.link/zhjFDJ",
    "https://acortar.link/vqVffG"
  ];

const Introduction = () => {
    return <Carousel prop1={images}/>
}

export default Introduction
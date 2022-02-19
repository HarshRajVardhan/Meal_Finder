import React from 'react'
import '../App.css';
import Receipe from './Receipe';
import { useState } from 'react';

export default function (props) {
    const [currentReceipe, setCurrentReceipe] = useState(null)
    return (
        <>
            <div className='meals' id='meals'>
                {
                    props.meals.map((e) => {
                        return <div className='meal' onClick={() => setCurrentReceipe(e)} >
                            <img src={e.strMealThumb} alt={e.strMeal}/>
                            <div className='meal-info' data-mealid={e.idMeal}>
                                <h3>{e.strMeal}</h3>
                            </div>
                        </div>
                    })
                }
            </div>
            {
                currentReceipe ? <Receipe meal={currentReceipe} /> : null
            }
        </>
    )
}

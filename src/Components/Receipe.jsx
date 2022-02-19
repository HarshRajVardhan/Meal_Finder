import React from 'react'
import '../App.css'

export default function Receipe(props) {
  const ingredients = [];
  for(let i=1;i<=20;i++) {
    const name = 'strIngredient' + i;
    ingredients[i-1] = props.meal[name];
  } 
  return (
    <div id='single-meal'>
        <div className='single-meal'>
            <h1>{props.meal.strMeal}</h1>
            <img src={props.meal.strMealThumb} alt={props.meal.strMeal}/>
            <div className='single-meal-info'>
                <p>{props.meal.strCategory}</p>
                <p>{props.meal.strArea}</p>
            </div>
            <div className='main'>
                <p>{props.meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                  {
                    ingredients.map((e) => e ? <li key={e}>{e}</li> : null)
                  }
                </ul>
            </div>
        </div>
    </div>
  )
}

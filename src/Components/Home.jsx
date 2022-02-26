import React from 'react'
import '../Home.css'
import '../App.css'
import { useState, useRef, useEffect } from 'react';
import SearchResult from './SearchResult';
import Receipe from './Receipe';

export default function Home() {
    const [keyword, setKeyword] = useState('')
    const [meals, setMeals] = useState([]);
    const [currentReceipe, setCurrentReceipe] = useState(null)
    const [showResult, setShowResult] = useState(false)
    const [showReceipe, setShowReceipe] = useState(false)
    const resultHeading = useRef()
    const search = async (e) => {
        e.preventDefault();
        if (keyword == '') {
            alert('Please enter a search term.');
            return;
        }
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + keyword)
            const data = await response.json();
            if (data.meals === null) {
                resultHeading.current.textContent = `There are no search results. Try again!`;
                setShowResult(false)
                setKeyword('')
                return;
            } else {
                setMeals(data.meals);
                setShowResult(true)
                setShowReceipe(false)
                setKeyword('')
                resultHeading.current.textContent = `Search result for '${keyword}':`;
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=> {
        if(showReceipe) {
            resultHeading.current.textContent = '' 
        }
    }, [showReceipe])


    const random = async () => {
        try {
            setMeals([])
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php' + keyword)
            const data = await response.json();
            setCurrentReceipe(data.meals[0]);
            setShowReceipe(true)
            setShowResult(false)
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="container">
            <h1>Meal Finder</h1>
            <div className="flex">
                <form className="flex" id="submit" onSubmit={search}>
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Search for meals or keywords" />

                    <button className="search-btn" type="submit">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </form>
                <button className="random-btn" id="random" onClick={random}>
                    <i className="fa fa-random" aria-hidden="true"></i>
                </button>
            </div>
            <div id="result-heading"><h2 ref={resultHeading}></h2></div>
            {
                showResult ? <><SearchResult meals={meals} /></> : null
            }
            {
                showReceipe ? <Receipe meal={currentReceipe} /> : null
            }
        </div>
    )
}

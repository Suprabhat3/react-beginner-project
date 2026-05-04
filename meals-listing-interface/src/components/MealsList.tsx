import React from 'react'
import MealCard from './MealCard'

type Props = { meals: any[]; onViewRecipe: (meal: any) => void }

const MealsList: React.FC<Props> = ({ meals, onViewRecipe }) => {
  return (
    <div className="meals-grid">
      {meals.map((m: any, index: number) => (
        <div 
          key={m.id || m._id || m.strMeal || m.name} 
          className="opacity-0 translate-y-4 animate-fade-in-up" 
          style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'forwards' }}
        >
          <MealCard meal={m} onViewRecipe={onViewRecipe} />
        </div>
      ))}
    </div>
  )
}

export default MealsList

import React from 'react'

type Props = { meal: any; onViewRecipe: (meal: any) => void }

const MealCard: React.FC<Props> = ({ meal, onViewRecipe }) => {
  const title = meal.title || meal.name || meal.strMeal || 'Untitled'
  const img = meal.thumbnail || meal.image || meal.thumb || meal.strMealThumb || ''
  const category = meal.category || meal.cuisine || meal.area || meal.strCategory
  const description = meal.description || meal.instructions || meal.strInstructions || ''

  return (
    <article className="meal-card">
      <div className="meal-media">
        {img ? (
          <img src={img} alt={title} />
        ) : (
          <div className="w-full h-[200px] bg-[#f3ece2] flex items-center justify-center">
            <span className="text-5xl opacity-50">🍽️</span>
          </div>
        )}

        {category && <span className="meal-tag">{category}</span>}
      </div>

      <div className="meal-content">
        <h3 className="meal-title line-clamp-1">{title}</h3>

        {description && <p className="meal-description line-clamp-3">{description}</p>}

        <div className="meal-actions">
          <button className="meal-button" type="button" onClick={() => onViewRecipe(meal)}>
            View recipe
          </button>
        </div>
      </div>
    </article>
  )
}

export default MealCard

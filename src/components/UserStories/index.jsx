import story1 from '../../assets/Rectangle 1663.png'
import story2 from '../../assets/Rectangle 1671.png'
import story3 from '../../assets/Rectangle 1673.png'
import story4 from '../../assets/Rectangle 1667.png'
import story5 from '../../assets/Rectangle 1672.png'
import story6 from '../../assets/Rectangle 1668.png'
import story7 from '../../assets/Rectangle 1666.png'

import leftArrow from '../../assets/Frame 1444.png'
import rightArrow from '../../assets/Frame 1443.png'

import './index.css'

const storyImages = [
  story1,
  story2,
  story3,
  story4,
  story5,
  story6,
  story7,
]

const UserStories = () => {
  return (
    <section className="stories-container">
      <button type="button" className="story-arrow">
        <img src={leftArrow} alt="previous" />
      </button>

      <div className="stories-list">
        {storyImages.map((image, index) => (
          <div className="story-item" key={index}>
            <img
              src={image}
              alt="story"
              className="story-image"
            />

            <p>Name</p>
          </div>
        ))}
      </div>

      <button type="button" className="story-arrow">
        <img src={rightArrow} alt="next" />
      </button>
    </section>
  )
}

export default UserStories
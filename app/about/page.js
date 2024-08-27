import React from 'react';

const About = () => {
  return (
    // Describes what all things are present in this application and also mentions the way to connect with me.
    <div className='flex flex-col items-center p-16 bg-gray-500 text-white'>

      {/* Short description */}
      <article className='my-4'>
        <h1 className='text-xl md:text-2xl font-bold underline tracking-wide mb-1.5'>About Us</h1>
        <p className='text-base md:text-lg text-justify'>
          Welcome to the ultimate Pokémon resource! My platform is designed for every Pokémon enthusiast, from casual fans to dedicated trainers. Here, you’ll find a comprehensive collection of all available Pokémon, along with powerful search functionality to help you find your favorite ones quickly.
        </p>
      </article>

      {/* Services offered */}
      <article className='my-4'>
        <h1 className='text-xl md:text-2xl font-bold underline tracking-wide mb-1.5'>What we offer</h1>
        <ul className='text-base md:text-lg'>
          <li className='list-disc text-justify my-2'>
            Explore All Pokémon: Browse through the complete list of Pokémon. Each one is displayed with detailed information, making it easy for you to discover new Pokémon or learn more about your favorites.
          </li>

          <li className='list-disc text-justify my-2'>
            Pokedex Insights: Click on any Pokémon to dive into their unique Pokedex page. You’ll find everything from their attacks and effects to move types. Plus, we provide in-depth information on type interactions, so you can understand which Pokémon will perform best in battles.
          </li>

          <li className='list-disc text-justify my-2'>
            Strategic Battle Information: My platform goes beyond just basic info. We offer insights into which Pokémon types will deal double damage, take double damage, and how different types interact during battles. This feature is perfect for strategizing your next big win!
          </li>
        </ul>
      </article>

      {/* Contact */}
      <article className='my-4'>
        <h1 className='text-xl md:text-2xl font-bold underline tracking-wide mb-1.5'>Connect Us</h1>
        <p className='text-base md:text-lg text-justify'>
          We value our community of Pokémon trainers and fans. If you have any questions, suggestions, or just want to connect, feel free to reach out through my footer links. We’re always here to help you on your Pokémon journey.
        </p>
      </article>
    </div>
  )
}

export default About;
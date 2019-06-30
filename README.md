# Makao simulator
The reason this project was made is the overall dullness of makao. It become clear to me, that after a few games almost everyone uses the same strategy. One's actions could be easily written down in a simple step list or algorithm. The only variety in match results is caused by the general randomness of the game rules. That is why I decided to create a platform to compare strategies and find the optimal algorithm for makao.

## Makao
Makao (also known as Macau) is one of the most popular card games in Poland. If you want to read more about main game concepts you may wish to check [this link](https://en.wikipedia.org/wiki/Macau_(card_game)). Unfortunately there are many varieties of Makao (which sometimes may lead to an unsuspected dispute on a family meeting). All the minor rule tweaks will be covered in further sections of readme.


## How to run simulation?
Make sure that you have Node.js and NPM installed on your pc. Then just fork/clone this repository and run:
'''bash
npm i
node main.js
'''
You will be asked to choose available algorithms. Just write their names (in order! - The sitting order has non-neglible impact on final results) and press enter to run simulation. In about 1-3 minutes (depending on your machine's processing power) you should see the outcome on the screen.

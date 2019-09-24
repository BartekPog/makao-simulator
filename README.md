# Makao simulator
The reason this project was made is the overall dullness of makao. It become clear to me, that after a few games almost everyone uses the same strategy. One's actions could be easily written down in a simple step list or algorithm. The only variety in match results is caused by the general randomness of the game rules. That is why I decided to create a platform to compare strategies and find the optimal algorithm for Makao.


## How to run simulation?
Make sure that you have Node.js and NPM installed on your pc. Then just fork/clone this repository and run:
```bash
npm i
node main.js
```
You will be asked to choose available algorithms. Just write their names (in order! - The sitting order has non-neglible impact on final results) and press enter to run simulation. In about 1-3 minutes (depending on your machine's processing power) you should see the outcome on the screen.


## Makao
Makao (also known as Macau) is one of the most popular card games in Poland. If you want to read more about main game concepts you may wish to check [this link](https://en.wikipedia.org/wiki/Macau_(card_game)). Unfortunately there are many varieties of Makao (which sometimes may lead to an unsuspected dispute on a family meeting). Our version looks pretty much like this:

Card id | Card type | Action
----|---------|-----------------------------------
0 | **Joker** | substitutes any card chosen by owner
1 | **Ace** | makes color-change request, which lasts until the card is covered
2 | **2** | gives pull-2-cards request to next player
3 | **3** | gives pull-3-cards request to next player
4 | **4** | gives skip-1-turn request to next player
5 | **5** | no effect
6 | **6** | no effect
7 | **7** | no effect
8 | **8** | no effect
9 | **9** | no effect
10 | **10** | no effect
11 | **Jack** | makes non-action-card-type requests, which last until the card is covered.
12 | **Queen** | Only **queen of spades**: cancels all the request on the user. It can be placed with no color/type match if there is a pull-card or skip-turn request. **Queens of other colors** have no effect
13 | **King** | **King of hearts**: gives pull-5-cards request to next player. **King of spades**: gives pull-5-cards request and reverses the request flow (those five cards go to previous player). **Kings of other colors** have no effect

All the cards with **pull-card** request also make all the pull-card requests on current player add up to the newly created request. It works similarly with **skip-turn** requests. (You can protect yourself against those types of requests by giving another request of the same type and sort of reflecting the request on you)

### example 1
player 1: gives 2 of hearts (which gives pull-**2**-cards request to player 2)
player 2: gives 3 of hearts (which gives collectivly pull-**5**-cards request to player 3; player 2 **does not draw any cards**)
player 3: draws 5 cards

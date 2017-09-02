# Memory Game Project

## Table of Contents

* [Context](#Context)
* [Todos](#Todos)

## Context

This is an exercise done in the context of the Front-end nanodegree from [Udacity](https://classroom.udacity.com).

## Playing

The player must pair all the cards together. At each round, the player can turn 2 cards. If they match, their image will remain visible. If they don't, they turn again to hide.
The user wins when all cards are matched and displayed with their face up. A modal isthen displayed with congratulations, a quality rating and and an offer play again.

## Todos

### pre-game
* random cards shuffle
* icons selection

### during game
* card display
* on click, card turn (animation)
* after two cards turned, check if match (animation)
  .if match remain up (color change, no longer clickable)
  .if not turn around (animation)
* increment counter of turns
* display rating based on nb of turns
* restart button
* timer


### after game
* modal
* variables display
* play again button
  .reset vars

# Lesson 1: Development Tools

In order to be productive in software development, you need the right tools working in the right way.  Let's go through the basics.

## IDE

The integrated development environment (IDE) is essential to most power-users today.  In theory, you can do everything using any text editor and using a command line to build and run your code.  However, you will be much more efficient using a tool like VisualStudio Code where you can do everything from within it.  There are lots of IDEs -- depending on the language you are developing for.  VSCode supports a LOT of different languages.

Download and install VSCode.

## Version Control (or "Source Control")

The next essential tool is a version control system.  This allows you to work on software as part of a team -- where each developer works independently in their own environment.  But as they complete parts of the project, they can commit their work into a "repository" and everyone can synchronize.  

The version control system also allows you to figure out what changed and who changed it, and to go back and find code as it existed at various points in the past.  In addition, it has the notion of "branches" which you'll want as the project gets more complex and/or the team gets larger.  But even for an individual developer working on a project by themselves, version control is vital for "real" work.

The most popular version control system today is Git, and the most popular service supporting Git is GitHub.com.  It's free and beautifully integrated into VSCode.

Go to github.com and create an account.

## Package Manager

A package manager is a way for you to manage all of the components of your project -- especially third-party components that you will use. 

The most popular package manager for node is NPM.  In fact, when you install node, you will also be getting npm.

## Getting Started

1. Ensure that you have VSCode and node installed
2. Sign up for an account on github.com
3. Create a folder somewhere for this workspace
4. Open VSCode, click on the Source Control button on left-side, click on "Clone Repository" and enter the URL for this project:  https://github.com/kduffie/chess.git
5. Open a terminal inside VSCode
6. Install all of the dependencies by typing:  
```
npm install
```
7. Build the project by typing: 
```
npm run build
```

## Modular Development

One of the most common mistakes in software development is to start at the beginning.  You are anxious to get your code to start doing something useful as soon as possible.  

It's far better to think like an architect.  Figure out the rough outline of the finished product in your mind.  But then start thinking about the pieces you're going need.  Define the framework in the simplest possible terms, identify the different components you'll need and think about how they are going to fit together.  Then start building one component at a time.

So let's start with this example of a chess game.  Building a complete functioning chess game sounds daunting.  But you can make steady progress toward that goal and you'll be surprised how quickly you can get there.

The chess game has two players, a board, and pieces.  There are rules governing the initial setup, how pieces can move, and how the game ends.  We're going to need code that understands these rules.  We'll also need code that asks players what moves they want to make, and code that updates the board accordingly.  Where do we start?

We start with some basics -- the definitions that are shared in common by lots of components that we'll eventually need to develop.  

To do this, one needs to start with a rough model of how it is all eventually going to fit together.  For this first exercise, I'll be the one to define that overall vision.  I'm imagining some controller that sets up the board, asks each player in turn what move they want to make, a board object that keeps track of the current position, and a set of "pieces" of various kinds that have the logic that imposes the rules on how that piece is allowed to move.

One could envision many different ways to structure this program.  That's important.  There isn't just one right way.  And quite often as you get into the coding of a complex program, you'll sometimes find that you want to go back and start over with a revised model -- once you realize some of the shortcomings of your approach.  You'll often be able to reuse some of your work, but you need to be happy to let go of other parts of the design and just reimplement it.

In src/chess-common.js I've defined some basic types, interfaces, and classes that I foresee we'll need.  This is so-called "object-oriented programming".  Each object or concept in the real world is represented by a class or interface:  a board, a piece, a move, etc.  In the case of pieces, there are different kinds of pieces (pawn, rook, king, etc.) and each of these behaves differently, so I envision different classes for each of these different kinds of pieces.  The board is populated with instances of those classes.  As play progresses, the pieces move around on the board, or are removed.  In some cases (like pawns transforming into queens), pieces may get replaced on the board.

Rather that start at "the top" -- where we have code that starts asking the player for their first move -- we start at "the bottom" -- with the components we're going to need.  These are like lego pieces that we will eventually assemble into the full game.

So I've created src/pawn.ts.  This is the outline for the first component we need:  the "pawn".  This is a class that implements ChessPiece.  This class encapsulates the rules for how pawns are (and are not) allowed to move, given the current situation on the board around them.

Notice how its ```getAllowedMoves``` method has a "stub" implementation which simply returns an empty arrange of allowed moves independent of the situation.  Starting with a stub is always a good idea.  The code compiles.  It just isn't complete yet.

Eventually, we'll create classes for each of the pieces.  Then we'll create the controller that sets up the game.  And then we'll need other pieces such as figuring out when the game is over.  But we're just not going to worry about all that right now.  We're just going to get the pawn component built.

## Unit Testing

The problem with modular design like this is that if you start at the bottom, you will have to write all of the code before you can see if any of it works.  And that will be really frustrating and not very motivating.

A far better way to develop code is what is sometimes called "test-driven development".  It's an exciting concept.  The idea is that before writing a single line of "real" code, you first write code that will test all of the features in your code.  For example, for a pawn, we know that there are lots of different scenarios the code is going to have to handle -- moving forward, taking another piece, transforming to another piece, being blocked by other pieces, etc.  

So we start by write code that tests that our Pawn class works correcting for all of these cases.  These are called "unit tests".  This unit test code won't be used in our final design, but we will keep it forever because if and when we make changes, we can run unit tests again repeatedly to make sure that when making one change, we're not breaking anything that used to work.

In src/pawn-spec.ts, you'll find the unit tests for our new Pawn class.  This is built using a third-party library called "mocha".  Those functions, "describe" and "it", are from mocha.  They are designed to run the tests and report pass/fail.  The "assert" calls check a condition and stop right there (with an "exception") if the assertion fails.

Remember that with typescript/javascript, you can just run any file you want.  That's true, but we use a different tool, mocha, at the command line (instead of just node) so that it will run all of the tests and assemble results.

## Run the Unit Tests

To run all of the unit tests for the project, type:

```
npm run test
```

If you look in package.json, you'll see that under "scripts" there are a number of different entries there.  One of them is "test".  When you type, npm run test, you are just asking to find the appropriate command line from the package.json file and execute it.  This is just a convenience.  You could have entered the full mocha command line yourself with the same result.

Similarly, anytime you want to build your project (ie. compile typescript into javascript), you can type:

```
npm run build
```

This avoids you having to remember the command line required for the build.  (In future, that build command might get more complex as you start adding other things into the build process.)

## Assignment 1

You will see that pawn-spec.ts already has one simple unit test that checks one particular scenario -- of a pawn in its initial position, but on an empty board.  If you run your unit tests now (using the stub of the Pawn class), you'll see that it will fail -- as you expect.  You are returning no available moves, when there should be some.

Your first assignment is to add unit tests for an additional cases:
* The pawn is black instead of white; and
* The pawn has reached the end of the board.

Run your test and see that it fails as well.

## Assignment 2

Next you will add code to the Pawn to handle simple forward movement on an empty board for both black and white cases.

Run your unit tests.  They should now all pass.

## Assignment 3

Add unit tests for scenarios involving obstructions in the pawn's path.  Don't forget about the special case of the pawn's initial move.

Add code to the Pawn to handle obstructions and then run unit tests to verify your code.

## Assignment 4

Add unit tests and then code for the ability for the pawn to take other pieces when the are positioned according.  Don't forget to check for cases where the pawn is on one of the edges of the board.

## Assignment 5

Add unit tests and code for handling en passant.

## Assignment 6

Add unit tests and code for converting a pawn to another piece.  Remember that the pawn can be transformed into pieces other than a queen.
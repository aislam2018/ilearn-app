# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Subject.destroy_all
Deck.destroy_all
Card.destroy_all
subject1 = Subject.create(name: "Biology")
subject2 = Subject.create(name: "Psychology")
subject3 = Subject.create(name: "English")

deck1 = Deck.create(name: "Biology test 1")
deck2 = Deck.create(name: "Psychology test 1")
deck3 = Deck.create(name: "English test 1")

card1 = Card.create(question: "What is a cell nucleus?", answer: "The control room for the cell", subject: subject1, deck: deck1)
card2 = Card.create(question: "What is a B-cell?", answer: "An antibody producing cell", subject: subject1, deck: deck1)
card3 = Card.create(question: "What is a Barr body?", answer: "An inactive X chromosome", subject: subject1, deck: deck1)

card4 = Card.create(question: "Conformity?", answer: "adjusting behavior to meet a group's standard", subject: subject2, deck: deck2)
card5 = Card.create(question: "Consciousness?", answer: "one's awareness of one's environment and oneself", subject: subject2, deck: deck2)
card6 = Card.create(question: "Dendrite?", answer: "a branch off the cell body of a neuron that receives new information from other neurons", subject: subject2, deck: deck2)

card7 = Card.create(question: "arid", answer: "very dry", subject: subject3, deck: deck3)
card8 = Card.create(question: "deleterious", answer: "harmful", subject: subject3, deck: deck3)
card9 = Card.create(question: "intrepid", answer: "fearless", subject: subject3, deck: deck3)

card10 = Card.create(question: "neuron", answer: "a cell in the brain", subject: subject1, deck: deck2)
card11 = Card.create(question: "Anxiety", answer: "a state of apprehension and psychic tension occurring in some forms of mental disorder", subject: subject2, deck: deck3)
card12 = Card.create(question: "convergence", answer: "coming together", subject: subject3, deck: deck1)

class Subject < ApplicationRecord
  has_many  :cards
  has_many  :decks, through: :cards
end

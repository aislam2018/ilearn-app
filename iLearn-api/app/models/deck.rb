class Deck < ApplicationRecord
  has_many  :cards
  has_many  :subjects, through: :cards
end

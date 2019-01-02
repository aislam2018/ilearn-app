class Card < ApplicationRecord
  belongs_to :subject
  belongs_to :deck
end

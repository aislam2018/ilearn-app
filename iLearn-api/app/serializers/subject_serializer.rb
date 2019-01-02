class SubjectSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many  :cards
  has_many  :decks, through: :cards


end

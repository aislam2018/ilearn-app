class DeckSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many  :cards
  has_many  :subjects, through: :cards


end

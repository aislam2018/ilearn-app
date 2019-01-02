
class CardSerializer < ActiveModel::Serializer
  attributes :id, :question, :answer

  belongs_to :subject
  belongs_to :deck


end

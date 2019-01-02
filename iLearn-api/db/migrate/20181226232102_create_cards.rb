class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.string :question
      t.string :answer
      t.references :subject, foreign_key: true
      t.references :deck, foreign_key: true

      t.timestamps
    end
  end
end

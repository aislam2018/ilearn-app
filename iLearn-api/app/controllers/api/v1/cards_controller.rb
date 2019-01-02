module Api
  module V1
      class CardsController < ApplicationController

        before_action :find_card, only:[:edit, :update, :destroy]

        def index
          @cards = Card.all
          render json: @cards
        end

        def new
          @card = Card.new
        end

        def create

          @subject = Subject.find_by_name( "#{params[:subject]}")
          @deck = Deck.find_by_name("#{params[:deck]}")
          tmp = params.require(:card).permit(:question, :answer)
          tmp[:subject_id] = @subject.id
          tmp[:deck_id] = @deck.id
          @card = Card.create(tmp)

          render json: @card
        end

        def destroy
          @card = Card.find(params[:id])
          @card.destroy
          render json: @card
        end

        def edit
        end

        def update
          @card.update(card_params)
          render json: @card
        end

        private

        def card_params
          params.require(:card).permit(:question, :answer, :subject, :deck)

        end

        def find_card
          @card = Card.find(params[:id])
        end


      end
    end
end

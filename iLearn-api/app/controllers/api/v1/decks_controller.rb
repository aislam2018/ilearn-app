
module Api
  module V1
    class DecksController < ApplicationController

      before_action :find_deck, only:[:edit, :update, :destroy]

      def index
        @decks = Deck.all
        render json: @decks
      end

      def new
        @deck = Deck.new
        # check to see if this was the issue
      end

      def create
        @deck = Deck.create(deck_params)
        render json: @deck
      end

      def destroy

        @deck.destroy
        render json: @deck
      end

      def edit
      end

      def update
        @deck.update(deck_params)
        render json: @deck
      end

      private

      def deck_params
        params.require(:deck).permit(:name)
      end

      def find_deck
        @deck = Deck.find(params[:id])
      end

    end
  end
end

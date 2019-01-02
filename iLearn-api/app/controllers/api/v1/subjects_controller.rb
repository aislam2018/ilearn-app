module Api
  module V1

    class SubjectsController < ApplicationController

      before_action :find_subject, only:[:edit, :update, :destroy]

      def index
        @subjects = Subject.all
        render json: @subjects
      end

      def new
        @subject = Subject.new
  
      end

      def create
        @subject = Subject.create(subject_params)
        render json: @subject
      end

      def destroy

        @subject.destroy
        render json: @subject
      end

      def edit
      end

      def update
        @subject.update(subject_params)
        render json: @subject
      end

      private

      def subject_params
        params.require(:subject).permit(:name)
      end

      def find_subject
        @subject = Subject.find(params[:id])
      end


    end
  end
end

class Api::PatientsController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def create
    @patient = Patient.new(patient_params.merge({email: "test#{rand(1000)}@test.com}", password: "abcdefgh"}))
    if @patient.save
      render json: @patient
    else
      render json: {"error": "missing params"}
    end    
  end

  def show
    @patient = Patient.find(params[:id])
    render json: @patient
  end

  def index
    @patients = Patient.all
    render json: @patients
  end

  def destroy
    @patient = Patient.find(params[:id])
    if @patient.destroy
      render json: @patient
    end
  end

  private

  def patient_params
    params.require(:patient).permit(:first_name, :last_name)
  end
end

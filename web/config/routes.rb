Rails.application.routes.draw do
  root to: 'dashboard#index'

  devise_for :users, :controllers => {sessions: 'users/sessions', registrations: 'users/registrations', passwords: 'users/passwords' }
  namespace :api do
    resources :physicians, only: %i(show) do
      member do
        resources :patients do
          resources :image_sets do
            resources :images, only: %i(create)
          end
        end
      end
    end

    # resources :images
    # resources :sets
  end
end

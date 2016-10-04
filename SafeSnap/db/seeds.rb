# # This file should contain all the record creation needed to seed the database with its default values.
# # The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
# #
# # Examples:
# #
# #   cities = City.create([{ name: 'Chicago' }, { name: 'Copen\hagen' }])
# #   Mayor.create(name: 'Emanuel', city: cities.first)

# dr_esop = Physician.find_by(email: "esop@gmail.com")
# dr_wilson = Physician.find_by(email: "wilson@gmail.com")

# # dr_esop.patients.create({email: "ben@gmail.com", password: "abcdefgh", first_name: "Ben", last_name: "Sparrow", profile_photo_url: "http://localhost:3000/assets/profile_photos/ben.png"})
# # dr_esop.patients.create({email: "max@gmail.com", password: "abcdefgh", first_name: "Max", last_name: "Brenner", profile_photo_url: "http://localhost:3000/assets/profile_photos/max.png"})

# dr_wilson.patients.create({email: "jun@gmail.com", password: "abcdefgh", first_name: "Jun", last_name: "Chen", profile_photo_url: "http://localhost:3000/assets/profile_photos/max.png"})
# dr_wilson.patients.create({email: "mike@gmail.com", password: "abcdefgh", first_name: "Mike", last_name: "Wallace", profile_photo_url: "http://localhost:3000/assets/profile_photos/mike.png"})
# dr_wilson.patients.create({email: "ben@gmail.com", password: "abcdefgh", first_name: "Ben", last_name: "Sparrow", profile_photo_url: "http://localhost:3000/assets/profile_photos/ben.png"})
# dr_wilson.patients.create({email: "max@gmail.com", password: "abcdefgh", first_name: "Max", last_name: "Brenner", profile_photo_url: "http://localhost:3000/assets/profile_photos/max.png"})

# ben = dr_wilson.patients.first
# ben.save!

# # bens_foot_set = ben.image_sets.create({name: "Foot", description: "Patient is a 66 y/o male with a history of type 2 diabetes, complicated by retinopathy, CAD, and peripheral disease. Treated with toe amputation."})
# bens_foot_set = ImageSet.first
# bens_foot_set.images.create({url: "http://localhost:3000/assets/wound_imgs/week_1.JPG", description: "Week 5", created_at: Date.today})
# bens_foot_set.images.create({url: "http://localhost:3000/assets/wound_imgs/week_2.JPG", description: "Week 4", created_at: 1.week.ago})
# bens_foot_set.images.create({url: "http://localhost:3000/assets/wound_imgs/week_4.JPG", description: "Week 3", created_at: 2.weeks.ago})
# bens_foot_set.images.create({url: "http://localhost:3000/assets/wound_imgs/week_5.JPG", description: "Week 2", created_at: 3.weeks.ago})
# bens_foot_set.images.create({url: "http://localhost:3000/assets/wound_imgs/week_3.JPG", description: "Week 1", created_at: 4.weeks.ago})
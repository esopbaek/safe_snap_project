# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copen\hagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

dr_esop = Physician.find_by(email: "esop@gmail.com")
dr_wilson = Physician.find_by(email: "wilson@gmail.com")

dr_esop.patients.create({email: "ben@gmail.com", password: "abcdefgh", first_name: "Ben", last_name: "Sparrow", profile_photo_url: "http://localhost:3000/assets/profile_photos/ben.png"})
dr_esop.patients.create({email: "max@gmail.com", password: "abcdefgh", first_name: "Max", last_name: "Brenner", profile_photo_url: "http://localhost:3000/assets/profile_photos/max.png"})

dr_wilson.patients.create({email: "jun@gmail.com", password: "abcdefgh", first_name: "Jun", last_name: "Chen", profile_photo_url: "http://localhost:3000/assets/profile_photos/max.png"})
dr_wilson.patients.create({email: "mike@gmail.com", password: "abcdefgh", first_name: "Mike", last_name: "Wallace", profile_photo_url: "http://localhost:3000/assets/profile_photos/mike.png"})

ben = dr_esop.patients.first
ben.save!

bens_foot_set = ben.image_sets.create({name: "Foot", description: "Foot Photos"})
bens_foot_set.images.create({url: "http://localhost:3000/assets/wound_imgs/wound1.png", description: "Week 1"})
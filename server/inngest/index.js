import { Inngest } from "inngest";
import User from "../models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "pingup07" });

const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { email_addresses, id, first_name, last_name, image_url } =
      event.data;
    let username = email_addresses[0].email_addresses.split("@")[0];

    //check if username is available
    const user = await User.findOne({ username });

    if (user) {
      username = username + Math.floor(Math.random() * 10000);
    }

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      full_name: first_name + " " + last_name,
      profile_picture: image_url,
      username: username,
    };

    await User.create(userData);
  }
);

//Innest function to udates user data in database
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { email_addresses, id, first_name, last_name, image_url } =
      event.data;

    //check if username is available
    const updatedUserData = {
      email: email_addresses[0].email_address,
      full_name: first_name + " " + last_name,
      profile_picture: image_url,
    };

    await User.findByIdAndUpdate(id, updatedUserData);
  }
);

//Innest function to delete user data in database

const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;

    //check if username is available

    await User.findByIdAndDelete(id);
  }
);

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUserCreation, syncUserUpdation, syncUserDeletion];

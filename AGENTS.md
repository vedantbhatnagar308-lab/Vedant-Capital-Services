# Architecture
- Firebase Authentication owns administrator sessions; Cloud continues to store requests and send notifications so public workflows remain independent of sign-in.
- Administrator operations go through a Cloud edge function that verifies Firebase tokens and a protected UID role table; never authorize using profile fields or browser state.
- Firebase profiles are keyed by string Firebase UIDs in Cloud, separate from administrator roles, and accessed only through the verified edge function.
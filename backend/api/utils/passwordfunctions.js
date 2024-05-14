import bcrypt from "bcrypt";
import crypto from 'crypto';
export const passHashing = async password => {
  const saltRounds = await bcrypt.genSalt(parseInt(process.env.saltRounds));
    let hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};
export const passComparer = async (password, hashedPass) => {
  let result = await bcrypt.compare(password, hashedPass);
  return result;
};
export const generateOTP = (expiryMinutes = 5) => {
  const otp = crypto.randomInt(100000, 999999);
  const expiryTime = new Date();
  expiryTime.setMinutes(expiryTime.getMinutes() + expiryMinutes);

  return {
    code: otp.toString(),
    expiresAt: expiryTime,
  };
};
console.log("the generated otp is",generateOTP().code)
export const isOTPValid = (storedOTP, enteredOTP,expiresAt,res) => {
  // Check if the stored OTP and entered OTP match
  if (storedOTP !== enteredOTP) {
    res.status(401).json({message:`enter a valid otp please entered  ${enteredOTP} and stored ${storedOTP}`})
    return false;
  }
  // Check if the OTP has expired
  const currentDateTime = new Date();
  console.log('expiresAt:', expiresAt);
  const storedExpiresAt = expiresAt;
if(currentDateTime > storedExpiresAt){
  console.log(`do current  ${currentDateTime}  data greater  expiration date ${storedExpiresAt}?  `,currentDateTime > storedExpiresAt)
res.status(401).json({message:`the provided otp expired please try again as current date---${currentDateTime}-- and it is greater then  ${storedExpiresAt}`})
return false;
}
  return true;
};
 const otpCode =  generateOTP().expiresAt 
console.log(`Generated OTP: ${otpCode}`);
import React from "react";
import { auth } from "@/auth";
import Hero from "@/components/Hero";
import CostumerFeedback from "@/components/CostumerFeedback";
import FeaturesSection from "@/components/FeatureSection";


const page = async () => {
    const session = await auth();

    return (
        <div>
            {/* {session && (
          <>
          <div>{session.user?.name}</div>
          <Image src={session.user?.image} alt='profile image' width={72} height={72} className='rounded-full' />
          </>
        )}
      <LoginForm />
      <Form />     */}
            <Hero />
            <FeaturesSection /> 
            <CostumerFeedback />
            
            
        </div>
    );
};

export default page;

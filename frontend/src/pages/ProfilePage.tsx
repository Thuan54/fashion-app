import React from 'react';
import HeroBanner from '../components/HeroBanner';
import ProfileHeader from '../components/ProfileHeader';
import TabNavigation from '../components/TabNavigation';
import FilterBar from '../components/FilterBar';
import OutfitGrid from '../components/OutfitGrid';
import CapsuleWardrobe from '../components/CapsuleWardrobe';
import MoodBoard from '../components/MoodBoard';
import CommunityDialogue from '../components/CommunityDialogue';
import FloatingActionBar from '../components/FloatingActionBar';

const ProfilePage: React.FC = () => {
  return (
    <>
      <HeroBanner />
      <ProfileHeader />
      <TabNavigation />
      <FilterBar />
      <OutfitGrid />
      <CapsuleWardrobe />
      <MoodBoard />
      <CommunityDialogue />
      <FloatingActionBar />
    </>
  );
};

export default ProfilePage;
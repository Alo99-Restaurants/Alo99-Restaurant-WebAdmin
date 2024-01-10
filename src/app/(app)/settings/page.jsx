import { redirect } from 'next/navigation';
import React from 'react';

function SettingsPage() {
  redirect('/settings/general');
}

export default SettingsPage;

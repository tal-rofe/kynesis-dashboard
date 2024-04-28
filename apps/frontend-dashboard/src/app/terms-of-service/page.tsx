/* eslint-disable react/no-unescaped-entities */
'use client';

import React from 'react';


import { UISwitch } from '@/ui/UISwitch';
import { UILabel } from '@/ui/UILabel';

const TermsOfService = () => {

	


	return (
		<div className="container mx-auto px-4">
		<h1 className="text-3xl font-bold text-center my-6">Terms of Service</h1>
		<p className="text-sm text-gray-600 text-center mb-8">Last updated April 03, 2024</p>
  
		<section>
		  <h2 className="text-2xl font-semibold">Agreement to Terms</h2>
		  <p className="mt-2">
			These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Kynesis.io ("Company", “we”, “us”, or “our”), concerning your access to and use of the https://kynesis.io website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”). We are registered in Israel and have our registered office at Mevo Harimon 4, Ramat Gan, Israel. You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms of Use. If you do not agree with all of these terms of use, then you are expressly prohibited from using the Site and you must discontinue use immediately.
		  </p>
		  <p className="mt-2">
			Supplemental terms and conditions or documents that may be posted on the Site from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Use from time to time.
		  </p>
		</section>
  
		{/* Additional sections can be added here following the same pattern */}
		<section>
		  <h2 className="text-2xl font-semibold">Intellectual Property Rights</h2>
		  <p className="mt-2">
			Unless otherwise indicated, the Site and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the United States, international copyright laws, and international conventions. The Content and the Marks are provided on the Site “AS IS” for your information and personal use only. Except as expressly provided in these Terms of Use, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
		  </p>
		</section>
  
		{/* Repeat the pattern for other sections */}
		
		{/* Contact Us Section */}
		<section>
		  <h2 className="text-2xl font-semibold">Contact Us</h2>
		  <p className="mt-2">
			In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
		  </p>
		  <p className="mt-1">Kynesis.io</p>
		  <p>Harabi Mibachrach 4</p>
		  <p>Tel Aviv, Israel</p>
		  <p>Email: <a href="mailto:dev@kynesis.io" className="text-blue-500 hover:underline">dev@kynesis.io</a></p>
		</section>
  
	  </div>
	);
};

export default React.memo(TermsOfService);

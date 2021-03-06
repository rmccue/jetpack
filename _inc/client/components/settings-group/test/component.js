/**
 * External dependencies
 */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

/**
 * Internal dependencies
 */
import { SettingsGroup } from '../index';

describe( 'SettingsGroup', () => {

	const allGroupsNonAdminCantAccess = [
			'widget-visibility',
			'minileven',
			'contact-form',
			'sitemaps',
			'latex',
			'carousel',
			'tiled-gallery',
			'custom-content-types',
			'verification-tools',
			'markdown',
			'infinite-scroll',
			'gravatar-hovercards',
			'omnisearch',
			'custom-css',
			'sharedaddy',
			'widgets',
			'shortcodes',
			'related-posts',
			'videopress',
			'monitor',
			'sso',
			'vaultpress',
			'google-analytics',
			'seo-tools',
			'stats',
			'wordads',
			'manage',
			'likes',
			'shortlinks',
			'notes',
			'subscriptions',
			'protect',
			'enhanced-distribution',
			'comments',
			'json-api',
			'photon'
		],
		allGroupsForNonAdmin = [
			'after-the-deadline',
			'post-by-email'
		];

	let testProps = {
		learn_more_button: 'https://jetpack.com/support/protect',
		isDevMode: false,
		isSitePublic: true,
		userCanManageModules: true,
		isLinked: true,
		isUnavailableInDevMode: () => false
	};

	const settingsGroup = shallow( <SettingsGroup support={ testProps.learn_more_button } hasChild /> );

	it( 'outputs a special CSS class when it has the hasChild property', () => {
		expect( settingsGroup.find( 'Card' ).props().className ).to.contain( 'jp-form-has-child' );
	} );

	it( 'the learn more icon has an informational tooltip', () => {
		expect( settingsGroup.find( 'InfoPopover' ) ).to.have.length( 1 );
		expect( settingsGroup.find( 'ExternalLink' ).get( 0 ).props.href ).to.be.equal( 'https://jetpack.com/support/protect' );
	} );

	it( 'if no support link is passed directly, looks for one in the module', () => {
		expect( shallow( <SettingsGroup module={ testProps } /> ).find( 'InfoPopover' ) ).to.have.length( 1 );
	} );

	it( 'does not have a learn more icon if there is no link or module are passed', () => {
		expect( shallow( <SettingsGroup /> ).find( 'InfoPopover' ) ).to.have.length( 0 );
	} );

	describe( 'has a fading layer', () => {

		it( 'visible in in Dev Mode', () => {
			const disabled = {
				disableInDevMode: true,
				isUnavailableInDevMode: () => true
			};
			expect( shallow( <SettingsGroup { ...disabled } /> ).find( '.jp-form-block-fade' ) ).to.have.length( 1 );
		} );

		it( 'visible in Post by Email when user is unlinked', () => {
			const disabled = {
				module: {
					module: 'post-by-email'
				},
				isLinked: false
			};
			expect( shallow( <SettingsGroup { ...disabled } /> ).find( '.jp-form-block-fade' ) ).to.have.length( 1 );
		} );

		it( 'not visible in Post by Email when user is linked', () => {
			const disabled = {
				module: {
					module: 'post-by-email'
				},
				isLinked: true
			};
			expect( shallow( <SettingsGroup { ...disabled } /> ).find( '.jp-form-block-fade' ) ).to.have.length( 0 );
		} );

	} );

	describe( 'When user is not an admin', () => {

		Object.assign( testProps, {
			userCanManageModules: false
		} );

		it( 'does not render groups that are not After the Deadline or Post by Email', () => {
			allGroupsNonAdminCantAccess.forEach( item => {
				testProps.module = item;
				expect( shallow( <SettingsGroup module={ testProps } /> ).find( '.jp-form-settings-group' ) ).to.have.length( 0 );
			} );
		} );

		it( 'renders After the Deadline and Post by Email groups', () => {
			allGroupsForNonAdmin.forEach( item => {
				testProps.module = item;
				expect( shallow( <SettingsGroup module={ testProps } /> ).find( '.jp-form-settings-group' ) ).to.have.length( 1 );
			} );
		} );

	} );

} );

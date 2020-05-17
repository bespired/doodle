const menu = [
	{
		alias: 'prospects',
		label: 'Prospects',
		chapters: [
			{
				alias: 'prospects.results',
				label: 'Results',
				items: [
					{
						alias:    'prospects.results.audiences',
						label:    'Audiences',
						location: '/admin/doodles/audiences',
					},{
						alias:    'prospects.results.prospects',
						label:    'Prospects',
						location: '/admin/doodles/results/prospects'
					},{
						alias:    'prospects.results.contacts',
						label:    'Contacts',
						location: '/admin/doodles/results/contacts'
					},
				]
			},{
				alias: 'prospects.qualifiers',
				label: 'Qualifiers',
				items: [
					{
						alias:    'prospects.qualifiers.scoring',
						label:    'Scoring',
						location: '/admin/doodles/scoring'
					},{
						alias:    'prospects.qualifiers.segments',
						label:    'Segments',
						location: '/admin/doodles/segmenting'
					}
				]
			}, {
				alias: 'prospects.properties',
				label: 'Properties',
				items: [
					{
						alias:    'prospects.properties.attributes',
						label:    'Attributes',
						location: '/admin/doodles/attributes'
					},{
						alias:    'prospects.properties.groups',
						label:    'Groups',
						location: '/admin/doodles/use_groups'
					},{
						auth:     'superuser',
						alias:    'prospects.properties.logs',
						label:    'Logs',
						location: '/admin/doodles/logs'
					}
				]
			}
		]
	},
	{
		alias: 'contents',
		label: 'Contents',
		chapters: [
			{
				alias: 'contents.blocks',
				label: 'Building blocks',
				items: [
					{
						alias:    'contents.blocks.form',
						label:    'Forms',
						location: '/admin/content/scoring'
					},{
						alias:    'contents.blocks.partials',
						label:    'Partials',
						location: '/admin/content/segmenting'
					}
				]
			}, {
				alias: 'contents.content',
				label: 'Content',
				items: [
					{
						alias:    'contents.content.attributes',
						label:    'Collections',
						location: '/admin/content/collections'
					},{
						alias:    'contents.content.groups',
						label:    'Pages',
						location: '/admin/content/pages'
					}
				]
			}, {
				alias: 'contents.tools',
				label: 'Website tools',
				items: [
					{
						alias:    'contents.tools.website',
						label:    'Website',
						location: '/admin/content/',
					},{
						alias:    'contents.tools.urls',
						label:    'URL management',
						location: '/admin/content/'
					},{
						alias:    'contents.tools.sitemap',
						label:    'Sitemap',
						location: '/admin/content/'
					},
				]
			}, {
				alias: 'contents.storage',
				label: 'Storage',
				items: [
					{
						alias:    'contents.storage.assets',
						label:    'Assets',
						location: '/admin/content/assets'
					},{
						alias:    'contents.storage.downloads',
						label:    'Downloads',
						location: '/admin/content/downloads'
					}
				]
			}, {
				alias: 'contents.utils',
				label: 'Utilities',
				items: [
					{
						alias:    'contents.utils.integrator',
						label:    'Smart content integrator',
						location: '/admin/doodle/plans'
					},{
						alias:    'contents.utils.checker',
						label:    'Broken link checker',
						location: '/admin/content/link-checker'
					}
				]
			}

		]
	},
	{
		alias: 'mailer',
		label: 'Mailer',
		chapters: [
			{
				alias: 'mailer.mailing',
				label: 'Mailing',
				items: [
					{
						alias:    'mailer.mailing.emails',
						label:    'Emails',
						location: '/admin/mailer/emails',
					}
				]
			},{
				alias: 'mailer.settings',
				label: 'Settings',
				items: [
					{
						alias:    'mailer.settings.lists',
						label:    'Blacklists',
						location: '/admin/mailer/mailverifications'
					},{
						alias:    'mailer.settings.attributes',
						label:    'Email Settings',
						location: '/admin/mailer/emailsettings'
					},{
						alias:    'mailer.settings.groups',
						label:    'Status',
						location: '/admin/mailer/mailstatus'
					}
				]
			},{
				alias: 'mailer.design',
				label: 'Building design',
				items: [
					{
						alias:    'mailer.design.color',
						label:    'Colors',
						location: '/admin/mailer/colors'
					}
				]
			},
		]
	}, {
		alias: 'profile',
		label: 'Profile',
		chapters: [
			{
				alias: 'profile.profiles',
				label: 'Profiles',
				items: [
					{
						alias:    'profile.profiles.find',
						label:    'Profiles',
						location: '/admin/doodle/find',
					},
					{
						alias:    'profile.profiles.seclog',
						label:    'Seclog',
						location: '/admin/leadmanager/find/index/seclog',
					},
					{
						alias:    'profile.profiles.exchange',
						label:    'Exchange',
						location: '/admin/leadmanager/exchange/view',
					}
				]
			}, {
				alias: 'profile.settings',
				label: 'Properties',
				items: [
					{
						alias:    'profile.settings.tags',
						label:    'Tags',
						location: '/admin/doodle/tags'
					},{
						alias:    'profile.settings.fields',
						label:    'Fields',
						location: '/admin/doodle/formfields/person'
					},{
						alias:    'profile.settings.consents',
						label:    'Consents',
						location: '/admin/doodle/consents'
					}
				]
			}
		]
	}, {
		alias: 'automation',
		label: 'Automation',
		chapters: [
			{
				alias: 'automation.journey',
				label: 'Journey',
				items: [
					{
						alias:    'automation.journey.builder',
						label:    'Builder',
						location: '/admin/doodle',
					},
					{
						alias:    'automation.journey.goals',
						label:    'Goals',
						location: '/admin/doodle/lists/goals/index/',
					},
					{
						alias:    'automation.journey.active',
						label:    'Active',
						location: '/admin/automation/find/index/worker',
					}
				]
			}, {
				alias: 'automation.settings',
				label: 'Properties',
				items: [
					{
						alias:    'automation.settings.mappers',
						label:    'Mappers',
						location: '/admin/doodle/2/2/lists/mappers/index/'
					},{
						alias:    'automation.settings.extradata',
						label:    'Extradata',
						location: '/admin/doodle/2/2/lists/extradata/index/'
					},{
						alias:    'automation.settings.flowvariables',
						label:    'Flow variables',
						location: '/admin/doodle/2/2/lists/flowvariables/index/'
					},{
						alias:    'automation.settings.posturls',
						label:    'Post URLs',
						location: '/admin/doodle/2/2/lists/posturls/index/'
					},{
						alias:    'automation.settings.transformers',
						label:    'Transformers',
						location: '/admin/doodle/2/2/lists/transformers/index/'
					},{
						alias:    'automation.settings.concatinators',
						label:    'Concatinators',
						location: '/admin/doodle/2/2/lists/concatinators/index/'
					}
				]
			}
		]
	}
]
export default menu
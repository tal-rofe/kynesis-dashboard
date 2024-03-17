const config = {
	branches: ['main'],
	repositoryUrl: 'git+https://github.com/kynesis-io/dashboard',
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		'@semantic-release/changelog',
		['@semantic-release/npm', { npmPublish: false }],
		'@semantic-release/git',
		'@semantic-release/github',
	],
};

module.exports = config;

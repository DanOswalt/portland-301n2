
page('/about', aboutController.index, repos.requestRepos(repoView.index));
page('/', projectsController.index, Projects.fetchall(projectView.initIndexPage));
page();

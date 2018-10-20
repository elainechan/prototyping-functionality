# Prototyping Functionality

## Technology Stack
- Database: [MongoDB](https://www.mongodb.com/) database hosted on [mLab](https://mlab.com/), using [Mongoose](https://mongoosejs.com/) interface.
- Server and routing: [Node.js](https://nodejs.org/) server and routing using [Express](https://expressjs.com/) interface.
- Network graph: [Cytoscape.js](http://js.cytoscape.org/) for rendering network graph.
- Table: [Tabulator.js](http://tabulator.info/) and [ag-Grid](https://www.ag-grid.com/) for rendering tables.

## Data Sources
- MTA data is downloaded from Tyler Green's [GTFS-Graph data](https://github.com/tyleragreen/gtfs-graph/tree/master/data/mta) GitHub repo, manually processed with Pandas, and imported into mLab MongoDB database.

## Circuit Functionality
- [x] List different javascript libraries for rendering network diagrams. See [notes](./circuit/README.md)).
- [x] Create example networks using selected javascript libraries.
- [x] Select javascript library for rendering interactive circuits.
- [x] Render network nodes using different icons.
	- [x] Icons should be rendered according to train service availability on nodes. 
- [ ] Render network edges using different colors.
	- [ ] Edges should be highlighted according to train service availability on edges.
- [ ] Render network edges using different stroke patterns.
- [ ] Render network edges using different stroke widths.
- [ ] Show alert after clicking on a feature.
- [ ] Show tooltip/popup after clicking on a feature.
- [x] Find ways to let user move positions of network nodes.
	- Note: Cytoscape has abstracted this functionality into a style attribute that can be specified in one line.

## Table Functionality
- [x] List different javascript libraries for managing tables. See [notes](./table/README.md).
- [x] Decide columns to display.
- [x] Sort columns.
- [ ] Filter columns by value.
- [ ] Edit values directly in table.
- [ ] Show alert after clicking on row.

## Map Functionality
- [ ] Draw point.
- [ ] Draw polygon.
- [ ] Switch from cartographic view to satellite image view.
- [ ] Show points using different colors.
- [ ] Show polygons using different edge colors
- [ ] Show polygons using different fill colors.
- [ ] Show lines using different edge colors.
- [ ] Show lines using different stroke patterns.
- [ ] Show lines using different stroke widths.
- [ ] Show alert after clicking on feature.
- [ ] Show popup after clicking on feature.
- [ ] Get current location from user and show in map.
- [ ] Test maximum number of renderable features.

## Integrated functionality
- [ ] Highlight map feature and network feature when user clicks on table row.
- [ ] Highlight table row and network feature when user clicks on map feature.
- [ ] Highlight table row and map feature when user clicks on network feature.
- [ ] Render asset details form.
- [ ] List different javascript libraries for autocompletion.
- [ ] Draft interactive form.
- [ ] Let user add note to maintenance log.

## Planning
- [ ] Relationships
- [ ] Class diagram
- [ ] Data flow

## Resources
- [UML course](https://courses.edx.org/courses/course-v1:KULeuvenX+UMLx+1T2018/course/)
- [UML core reference](https://www.uml-diagrams.org/uml-core-reference.html)
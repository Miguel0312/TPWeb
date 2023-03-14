<?xml version="1.0" encoding="UTF-8"?>

<!-- New XSLT document created with EditiX XML Editor (http://www.editix.com) at Mon Mar 06 15:19:11 CET 2023 -->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:output method="html"/>
	
	<xsl:template match="/">
	<html>
		<head>
			<title>
				Countries of the world
			</title>
		</head>
		<body style="background-color: white;" >
		
<h1>Information about the countries</h1>
		
<xsl:apply-templates select="/countries/metadonnees"/>
		
Styled by: Miguel Vieira Pereira, Théo Gaige (B3225)
		
<hr/><hr/>
		
<h3>Countries where more than 2 languages are spoken:</h3>
		
<ul>
		
<xsl:for-each select="//country[count(./languages/*) > 2]">
		
	<li><xsl:value-of select="./country_name/common_name"/>: 
		
	<xsl:for-each select="./languages/*">
		
	<xsl:value-of select="."/> ( <xsl:value-of select="name(.)"/> )
		
	<xsl:if test="position() != last()">, </xsl:if>
		
	</xsl:for-each>
		
	</li>
		
</xsl:for-each>
		
		
<p>Countries having the most neighbours: 
		
<xsl:for-each select="//country">
		
<xsl:sort select="count(./borders/neighbour)" order="descending" data-type="number"/>
		
<xsl:if test="position() = 1">
		

<xsl:value-of select="./country_name/common_name"/>, nb de voisins <xsl:value-of select="count(./borders/neighbour)"/>
		
</xsl:if>
		
</xsl:for-each>
		
</p>
		
</ul>
		
<xsl:for-each select="//continent[not (./text() = ../../preceding::infosContinent/continent/text()) and ./text() != '']">
		
<h2>Pays du continent: <xsl:value-of select="./text()"/> par sous-régions</h2>
		
	
<xsl:for-each select="//subregion[not (./text() = ../../preceding::infosContinent/subregion/text()) and
		
	
			./preceding-sibling::continent/text() = current()]">
		
	
<h3><xsl:value-of select="."/> (<xsl:value-of select="count(//subregion[. = current()])"/> pays)</h3>
		
	

<table border="3"  width="600" align="center" >
		
	

	<th>Nbe</th>
		
	

	<th>Name</th>
		
	

	<th>Capital</th>
		
	

	<th>Coordinates</th>
		
	

	<th>Neighbours</th>
		
	

	<th>Flag</th>
		
	

	<th>Spoken Languages</th>
		
		<xsl:apply-templates select="/countries/country[./infosContinent/subregion=current()]"/>
		
	</table>
		
	</xsl:for-each>
		
</xsl:for-each>
		</body>
	</html>
	</xsl:template>
	
	<xsl:template match="metadonnees">
		<p style="text-align:center; color:green;" >
			Objectif: <xsl:value-of select="objectif"/>
		</p>
	</xsl:template>
	
	<xsl:template match="country">
	<tr>
		<td>
			<xsl:value-of select="position()"/>
		</td>
		<td >
			<span style="color: green"><xsl:value-of select="./country_name/offic_name"/></span>
			(<xsl:value-of select="./country_name/common_name"/>)
			<br/>
			<span style="color: blue" ><xsl:value-of select="./country_name/native_name[@lang='fra']/offic_name"/></span>
		</td>
		<td>
			<xsl:value-of select="./capital"/>
		</td>
		<td>
			Latitude: <xsl:value-of select="./coordinates/@lat"/> <br/>
			Longitude: <xsl:value-of select="./coordinates/@long"/>
		</td>
		<td>
			<xsl:for-each select="./borders/neighbour">
				<xsl:value-of select="/countries/country[country_codes/cca3 = current()]/country_name/common_name"/>
				<xsl:if test="position() != last()">, </xsl:if>
			</xsl:for-each>
			<xsl:if test="count(borders)=0 and landlocked='false'">
			Island
			</xsl:if>
		</td>
		<td>
			<img src="http://www.geonames.org/flags/x/{translate(./country_codes/cca2, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
			'abcdefghijklmnopqrstuvwxyz')}.gif" alt="" height="40" width="60"/>
		</td>
		<td>
			<xsl:for-each select="./languages/*">
				<xsl:value-of select="."/>
				<xsl:if test="position() != last()">, </xsl:if>
			</xsl:for-each>
		</td>
	</tr>
	</xsl:template>

</xsl:stylesheet>



<?xml version="1.0" encoding="UTF-8"?>

<!-- New XSLT document created with EditiX XML Editor (http://www.editix.com) at Mon Mar 06 15:19:11 CET 2023 -->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:output method="html"/>
  <xsl:param name="country_code" select="toto"/>
	
  <xsl:template match="/">
		<HTML>
			<BODY bgcolor="#FFFFCC">
				<element_a_recuperer>
					<table>
            <th>Nom</th>
            <th>Capital</th>
            <th>Langues</th>
            <th>Drapeau</th>
						<xsl:apply-templates select="//countries/country[country_codes/cca2= $country_code]"/>
					</table>
				</element_a_recuperer>
			</BODY>
		</HTML>
	</xsl:template>
  <xsl:template match="country">
		<tr>
      <td>
			  <xsl:value-of select="./country_name/offic_name"/>
      </td>
      <td>
        <xsl:value-of select="./capital"/>
      </td>
      <td>
			<xsl:for-each select="./languages/*">
				<xsl:value-of select="."/>
				<xsl:if test="position() != last()">, </xsl:if>
			</xsl:for-each>
		</td>
      <td>
			  <img src="http://www.geonames.org/flags/x/{translate(./country_codes/cca2, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
			'abcdefghijklmnopqrstuvwxyz')}.gif" alt="" height="40" width="60"/>
		  </td>
  	</tr>
	</xsl:template>

</xsl:stylesheet>


